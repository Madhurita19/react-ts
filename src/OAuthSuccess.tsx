import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role: string;
};

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    console.log("Response: "+token);
    if (token) {
      localStorage.setItem("token", token);

      try {
        const decoded: JwtPayload = jwtDecode(token);
        console.log("Role: "+decoded.role);

        switch (decoded.role) {
          case "ADMIN":
            navigate("/AdminDashboard");
            break;
          case "INSTRUCTOR":
            navigate("/InstructorDashboard");
            break;
          case "USER":
            navigate("/UserDashboard");
            break;
          default:
            navigate("/");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [params, navigate]);

  return <p>Redirecting...</p>;
}
