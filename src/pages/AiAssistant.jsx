

import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { AnimatePresence, motion } from 'framer-motion';

const content = "Artificial Intelligence (AI) refers to the ability of machines to perform tasks that typically require human intelligence, such as learning, reasoning, problem-solving, and decision-making. It encompasses a range of technologies that enable computers to perceive, understand, act, and learn from data. AI is not a single entity but rather a collection of technologies that work together to achieve these capabilities"

export async function enhanceText(text, tone) {
  const response = await fetch("/api/enhance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, tone }),
  });
  return response.json();
}

export async function generateOutput(input, tone) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input, tone }),
  });
  return response.json();
}

const promptTemplates = [
  "Reel script about [Book Title]",
  "Quote caption from [Book Title]",
  "Instagram post summarizing [Book Title]",
];

const toneOptions = ["Formal", "Funny", "Emotional"];

function usePromptRotation(intervalTime, templates) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % templates.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [intervalTime, templates]);
  return index;
}

function useTextSelection(inputRef) {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState({
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 0 },
    visible: false,
  });

  useEffect(() => {
    const handleMouseUp = () => {
      const textarea = inputRef.current;
      const selection = window.getSelection();
      const selected = selection.toString();

      if (selected && textarea?.contains(selection.anchorNode)) {
        const range = selection.getRangeAt(0);

        // Get bounding boxes for start and end
        const rects = range.getClientRects();
        const startRect = rects[0]; // First rect = start
        const endRect = range.getBoundingClientRect(); // Entire selected range

        setSelectedText(selected);
        setPosition({
          startPos: {
            x: startRect.left + window.scrollX,
            y: startRect.top + window.scrollY,
          },
          endPos: {
            x: endRect.right + window.scrollX,
            y: endRect.bottom + window.scrollY,
          },
          visible: true,
        });
      } else {
        setSelectedText("");
        setPosition({
          startPos: { x: 0, y: 0 },
          endPos: { x: 0, y: 0 },
          visible: false,
        });
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [inputRef]);

  return { selectedText, ...position };
}

function TextTyper({ content = '', loading }) {
  const [displayedText, setDisplayedText] = useState('');
  const frameRef = useRef(null);
  const charIndex = useRef(0);

  useEffect(() => {
    if (loading || !content) {
      setDisplayedText('');
      return;
    }

    setDisplayedText('');
    charIndex.current = 0;

    const type = () => {
      setDisplayedText((prev) => prev + content.charAt(charIndex.current));
      charIndex.current += 1;

      if (charIndex.current < content.length) {
        frameRef.current = setTimeout(type, 40); // Typing speed (ms)
      }
    };

    frameRef.current = setTimeout(type, 200); // Initial delay

    return () => clearTimeout(frameRef.current);
  }, [content, loading]);

  if (!content) return null;

  return (
    <div className="w-full flex justify-center items-start mt-10">
      <div className="font-mono whitespace-pre-wrap text-left  w-full p-4">
        {loading ? (
          <p className="italic">Loading content...</p>
        ) : (
          <span>
            {displayedText}
            {displayedText.length < content.length && (
              <span className="animate-pulse">|</span>
            )}
          </span>
        )}
      </div>
    </div>

  );
}


export default function PromptAssistant() {
  const [input, setInput] = useState("");
  const [outPutCopy, setOutPutCopied] = useState(false)
  const [previousInput, setPreviousInput] = useState("");
  const [tone, setTone] = useState("Formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const currentPromptIndex = usePromptRotation(5000, promptTemplates);
  const { selectedText, position,startPos, endPos,visible } = useTextSelection(inputRef);

  const handleEnhance = async () => {
    if (!selectedText) return;
    setPreviousInput(input); // Save for undo
    setLoading(true);
    try {
      const { enhancedText } = await enhanceText(selectedText, tone);
      if (enhancedText) {
        setInput((prev) => prev.replace(selectedText, enhancedText));
      }
    } catch (error) {
      console.error("Enhancement failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      // const { content } = await generateOutput(input, tone);
      setOutput(content || "No output generated.");
    } catch (error) {
      console.error("Generation failed:", error);
      setOutput("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = () => {
    if (previousInput) setInput(previousInput);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setOutPutCopied(true)
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
        <h2 className="text-2xl font-semibold">AI Prompt Assistant for Book Creators</h2>
        <p className="text-sm text-muted-foreground">
          💡 Tip: Add a book title, scene description, or emotion for best results.
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPromptIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="inline-block"
          >
            <Button variant="outline" onClick={() => setInput(promptTemplates[currentPromptIndex])}>
              {promptTemplates[currentPromptIndex]}
            </Button>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 flex-wrap mt-2">
          {toneOptions.map((t) => (
            <Button key={t} size="sm" variant={tone === t ? "default" : "outline"} onClick={() => setTone(t)}>
              {t}
            </Button>
          ))}
        </div>
        {output && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="mt-6 relative">
              <CardContent className="p-4 whitespace-pre-wrap">
                <TextTyper content={output} loading={false} />
                <Button
                  className="absolute top-2 right-2 text-xs"
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                >
                  {outPutCopy ? "copied" : 'copy'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
        <div ref={inputRef} className="relative border">
          <Textarea
            className="h-32 "
            placeholder="Enter your prompt or content here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {visible && (
            <>
              {/* Button at start */}
              <button
                className="absolute bg-blue-600 text-white px-2 py-1 rounded"
                style={{ left: startPos.x, top: startPos.y }}
              >
                Start
              </button>

              {/* Button at end */}
              {/* <button
                className="absolute bg-green-600 text-white px-2 py-1 rounded"
                style={{ left: endPos.x, top: endPos.y }}
              >
                End
              </button> */}
            </>
          )}
        </div>

        <div className="text-right text-xs text-gray-500">
          {input.length} characters
        </div>

        {selectedText.trim() && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between mt-1">
            <Button onClick={handleEnhance} disabled={loading} size="sm">
              {loading ? "Enhancing..." : "Enhance Selected Text"}
            </Button>
            {previousInput && (
              <Button onClick={handleUndo} size="sm" variant="outline">
                Undo
              </Button>
            )}
          </motion.div>
        )}

        <div className="flex items-end">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()} className="w-full">
            {loading ? "Generating..." : "Generate Output"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// import React, { useState, useRef, useEffect } from 'react';
// import { Textarea } from "../components/ui/textarea";
// import { Button } from "../components/ui/button";
// import { Card, CardContent } from "../components/ui/card";
// import { AnimatePresence, motion } from 'framer-motion';

// const promptTemplates = [
//   "Reel script about [Book Title]",
//   "Quote caption from [Book Title]",
//   "Instagram post summarizing [Book Title]",
// ];

// const toneOptions = ["Formal", "Funny", "Emotional"];

// function usePromptRotation(intervalTime, templates) {
//   const [index, setIndex] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % templates.length);
//     }, intervalTime);
//     return () => clearInterval(interval);
//   }, [intervalTime, templates]);
//   return index;
// }

// function useTextSelection(inputRef) {
//   const [selectedText, setSelectedText] = useState("");

//   useEffect(() => {
//     const handleMouseUp = () => {
//       const textarea = inputRef.current;
//       const selection = window.getSelection();
//       const selected = selection.toString();
//       if (selected && textarea?.contains(selection.anchorNode)) {
//         setSelectedText(selected);
//       } else {
//         setSelectedText("");
//       }
//     };
//     document.addEventListener("mouseup", handleMouseUp);
//     return () => {
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [inputRef]);

//   return selectedText;
// }

// export default function PromptAssistant() {
//   const [input, setInput] = useState("");
//   const [tone, setTone] = useState("Formal");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef(null);
//   const currentPromptIndex = usePromptRotation(5000, promptTemplates);
//   const selectedText = useTextSelection(inputRef);

//   const handleEnhance = async () => {
//     if (!selectedText) return;
//     setLoading(true);
//     try {
//       const response = await fetch("/api/enhance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: selectedText, tone }),
//       });
//       const data = await response.json();
//       if (data?.enhancedText) {
//         setInput((prev) => prev.replace(selectedText, data.enhancedText));
//       }
//     } catch (error) {
//       console.error("Enhancement failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerate = async () => {
//     if (!input) return;
//     setLoading(true);
//     try {
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ input, tone }),
//       });
//       const data = await response.json();
//       setOutput(data?.content || "No output generated");
//     } catch (error) {
//       console.error("Generation failed:", error);
//       setOutput("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="space-y-4"
//       >
//         <h2 className="text-2xl font-semibold">AI Prompt Assistant for Book Creators</h2>

//         <p className="text-sm text-muted-foreground">
//           💡 Tip: Add a book title, scene description, or your desired emotion for best results.
//         </p>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentPromptIndex}
//             initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
//             transition={{ duration: 0.6, ease: "easeInOut" }}
//             className="inline-block"
//           >
//             <Button variant="outline" onClick={() => setInput(promptTemplates[currentPromptIndex])}>
//               {promptTemplates[currentPromptIndex]}
//             </Button>
//           </motion.div>
//         </AnimatePresence>

//         {input.length > 5 && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             transition={{ duration: 0.6, ease: "easeInOut" }}
//             className="flex flex-wrap gap-2"
//           >
//             <div className="flex gap-2 flex-wrap mt-2">
//               {toneOptions.map((t) => (
//                 <Button
//                   key={t}
//                   size="sm"
//                   variant={tone === t ? "default" : "outline"}
//                   onClick={() => setTone(t)}
//                 >
//                   {t}
//                 </Button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         <Textarea
//           ref={inputRef}
//           className="h-32 mt-4"
//           placeholder="Enter your prompt or content here..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />

//         {selectedText.trim() && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex justify-end mt-1"
//           >
//             <Button onClick={handleEnhance} disabled={loading} size="sm">
//               Enhance Selected Text
//             </Button>
//           </motion.div>
//         )}

//         <div className="flex items-end">
//           <Button onClick={handleGenerate} disabled={loading || !input} className="w-full">
//             {loading ? "Generating..." : "Generate Output"}
//           </Button>
//         </div>

//         {output && (
//           <Card className="mt-6">
//             <CardContent className="p-4 whitespace-pre-wrap">
//               {output}
//             </CardContent>
//           </Card>
//         )}
//       </motion.div>
//     </div>
//   );
// }




// import React, { useState, useRef, useEffect } from 'react';
// import { Textarea } from "../components/ui/textarea";
// import { Button } from "../components/ui/button";
// import { Card, CardContent } from "../components/ui/card";
// import { Input } from "../components/ui/input";
// import { AnimatePresence, motion } from 'framer-motion';

// const promptTemplates = [
//   "Reel script about [Book Title]",
//   "Quote caption from [Book Title]",
//   "Instagram post summarizing [Book Title]",
// ];

// const toneOptions = ["Formal", "Funny", "Emotional"];

// export default function PromptAssistant() {
//   const [input, setInput] = useState("");
//   const [tone, setTone] = useState("Formal");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedText, setSelectedText] = useState("");
//   const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPromptIndex((prev) => (prev + 1) % promptTemplates.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleMouseUp = () => {
//       const textarea = inputRef.current;
//       const selection = window.getSelection();
//       const selected = selection.toString();
//       if (selected && textarea?.contains(selection.anchorNode)) {
//         setSelectedText(selected);
//       } else {
//         setSelectedText("");
//       }
//     };

//     document.addEventListener("mouseup", handleMouseUp);
//     return () => {
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   const handleEnhance = async () => {
//     if (!selectedText) return;
//     setLoading(true);
//     try {
//       const response = await fetch("/api/enhance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: selectedText, tone }),
//       });
//       const data = await response.json();
//       if (data?.enhancedText) {
//         setInput((prev) => prev.replace(selectedText, data.enhancedText));
//         setSelectedText("");
//       }
//     } catch (error) {
//       console.error("Enhancement failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerate = async () => {
//     if (!input) return;
//     setLoading(true);
//     try {
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ input, tone }),
//       });
//       const data = await response.json();
//       setOutput(data?.content || "No output generated");
//     } catch (error) {
//       console.error("Generation failed:", error);
//       setOutput("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="space-y-4"
//       >
//         <h2 className="text-2xl font-semibold">AI Prompt Assistant for Book Creators</h2>

//         <p className="text-sm text-muted-foreground">💡 Tip: Add a book title, scene description, or your desired emotion for best results.</p>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentPromptIndex}
//             initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
//             transition={{ duration: 0.6, ease: "easeInOut" }}
//             className="inline-block"
//           >
//             <Button variant="outline" onClick={() => setInput(promptTemplates[currentPromptIndex])}>
//               {promptTemplates[currentPromptIndex]}
//             </Button>
//           </motion.div>
//         </AnimatePresence>

//         {input.length > 5 && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             transition={{ duration: 0.6, ease: "easeInOut" }}
//             className="flex flex-wrap gap-2"
//           >
//             <div className="flex gap-2 flex-wrap mt-2">
//               {toneOptions.map((t) => (
//                 <Button
//                   key={t}
//                   size="sm"
//                   variant={tone === t ? "default" : "outline"}
//                   onClick={() => setTone(t)}
//                 >
//                   {t}
//                 </Button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         <Textarea
//           ref={inputRef}
//           className="h-32 mt-4"
//           placeholder="Enter your prompt or content here..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />

//         {selectedText.trim() && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex justify-end mt-1"
//           >
//             <Button onClick={handleEnhance} disabled={loading} size="sm">
//               Enhance Selected Text
//             </Button>
//           </motion.div>
//         )}

//         <div className="flex items-end">
//           <Button onClick={handleGenerate} disabled={loading || !input} className="w-full">
//             {loading ? "Generating..." : "Generate Output"}
//           </Button>
//         </div>

//         {output && (
//           <Card className="mt-6">
//             <CardContent className="p-4 whitespace-pre-wrap">
//               {output}
//             </CardContent>
//           </Card>
//         )}
//       </motion.div>
//     </div>
//   );
// }
