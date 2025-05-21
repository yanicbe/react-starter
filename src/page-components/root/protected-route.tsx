import { Role } from "@/lib/api/interfaces/utils";

const ProtectedRoute = ({ role, children }: { role: Role; children: React.ReactNode }) => {
  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
