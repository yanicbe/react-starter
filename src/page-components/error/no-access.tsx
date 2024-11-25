import { H2 } from "@/ui-components/ui/headings";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoAccess = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/benutzer");
  }, [navigate]);

  return (
    <div className="h-full">
      <div className="w-1/2 m-auto h-full flex flex-col justify-center">
        <H2 className="mb-20 text-center">Du hast keinen Zugriff auf {title}</H2>
        <p className="text-center">Bitte wende dich an den Administrator, um Zugriff zu erhalten.</p>
      </div>
    </div>
  );
};

export default NoAccess;
