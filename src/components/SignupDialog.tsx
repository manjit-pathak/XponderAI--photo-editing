import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupDialog({ isOpen, onClose }: SignupDialogProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate signup process
    try {
      // In a real app, you would call an API here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Successful signup
      setIsLoading(false);
      onClose();
      navigate("/editor");
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0F2A27] border-[#1A3B37] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00A693]">
            Create an Account
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Join Sobi to access all features and save your edited images.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignup} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#0B1C1A] border-[#1A3B37] text-white"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0B1C1A] border-[#1A3B37] text-white"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#0B1C1A] border-[#1A3B37] text-white"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-[#00A693] hover:bg-[#008F7D] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
