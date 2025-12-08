import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../App";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Briefcase } from "lucide-react";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (email === "admin@mtmkay.com" && password === "password") {
      login();
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - MTMKay</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <Briefcase className="mx-auto h-12 w-auto text-primary" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Admin Portal Login
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <p className="text-xs text-center text-gray-500">
              Demo: admin@mtmkay.com / password
            </p>
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
