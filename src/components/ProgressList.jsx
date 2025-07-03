import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Slider } from "../components/ui/slider";
import { toast } from "sonner";
import { Button } from "../components/ui/button";

export default function ProgressList({ list, handleUpdateProgress }) {
  const [editId, setEditId] = useState(null);
  const [updateValue, setUpdateValue] = useState(0);

  const handleUpdate = (id) => {
    if (isNaN(updateValue) || updateValue < 0 || updateValue > 100) {
      toast.error("Enter a valid percentage (0–100)");
      return;
    }

    handleUpdateProgress(id, Number(updateValue));
    toast.success("Progress updated");
    setEditId(null);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 p-4">
      {list.map(({ id, title, category, percentage }) => {
        const isComplete = percentage >= 100;
        return (
          <Card
            key={id}
            className={`transition-all ${
              isComplete ? "border-green-500 bg-green-100/20 opacity-60" : "hover:shadow-lg"
            }`}
          >
            <CardContent
              className="space-y-2 p-4"
              onClick={() => {
                setEditId(id);
                setUpdateValue(percentage);
              }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{title}</h3>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">{category}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 relative">
                <div
                  className={`h-3 rounded-full ${
                    percentage < 40
                      ? "bg-red-400"
                      : percentage < 70
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <div className="text-sm text-gray-600">Progress: {percentage}%</div>

              {editId === id && !isComplete && (
                <div className="space-y-2">
                  <Slider
                    value={[updateValue]}
                    onValueChange={(val) => setUpdateValue(val[0])}
                    max={100}
                    step={1}
                  />
                  <Input
                    type="number"
                    value={updateValue}
                    onChange={(e) => setUpdateValue(Number(e.target.value))}
                  />
                  <Button onClick={() => handleUpdate(id)}>Update</Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}