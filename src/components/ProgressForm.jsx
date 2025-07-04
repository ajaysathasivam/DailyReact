import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { toast } from "sonner";

const categories = ["Health", "Work", "Coding", "Finance", "Hobby"];

export default function ProgressForm({ handleFormData }) {
  const [form, setForm] = useState({
    title: "",
    category: "Coding",
    percentage: "",
  });

  const isFormValid = () => {
    const { title, category, percentage } = form;
    const percent = Number(percentage);
    return (
      title.trim() &&
      category &&
      percentage !== "" &&
      !isNaN(percent) &&
      percent >= 0 &&
      percent <= 100
    );
  };

  const handleInputChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast.error("Please fill out all fields correctly (0–100%)");
      return;
    }

    handleFormData({ ...form, percentage: Number(form.percentage) });

    setForm({ title: "", category: "Coding", percentage: "" });
    toast.success("Progress added!");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="p-4 space-y-4 bg-white shadow-md rounded-xl max-w-md mx-auto"
      aria-label="Add Progress Form"
    >
      <label htmlFor="title" className="sr-only">
        Title
      </label>
      <Input
        id="title"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleInputChange("title")}
        required
      />

      <label htmlFor="category" className="sr-only">
        Category
      </label>
      <Select
        value={form.category}
        onValueChange={(val) => setForm({ ...form, category: val })}
      >
        <SelectTrigger id="category">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label htmlFor="percentage" className="sr-only">
        Progress Percentage
      </label>
      <Input
        id="percentage"
        name="percentage"
        type="number"
        placeholder="Progress %"
        value={form.percentage}
        onChange={handleInputChange("percentage")}
        min="0"
        max="100"
        required
      />

      <Button type="submit" className="w-full">
        Add Progress
      </Button>
    </form>
  );
}
