import { Button } from "@/ui-components/ui/button";
import { H2 } from "@/ui-components/ui/headings";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/benutzer");
  }, [navigate]);

  return (
    <div className="h-full">
      <div className="w-1/2 m-auto h-full flex flex-col justify-center">
        <H2 className="mb-20 text-center">Diese Seite wurde nicht gefunden</H2>
        <p className="text-center">Wenn das ein Fehler sein sollte, kontaktieren Sie den Support</p>
        <div className="flex gap-2">
          <Link to="/support">
            <Button className="mt-5" variant="outline">
              Support kontaktieren
            </Button>
          </Link>
          <Link to="/">
            <Button className="mt-5">Zurück zur Startseite</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;