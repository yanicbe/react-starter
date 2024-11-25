import useApiRequest from "@/lib/hooks/use-request";
import { Button } from "@/ui-components/ui/button";
import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const MailVerification = () => {
  const { apiRequest } = useApiRequest();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mail = searchParams.get("mail");

  const resendMail = async () => {
    await apiRequest("user-profile/resend-email-verification", "POST", {
      toast: {
        toastText: "Email wurde erneut gesendet",
      },
    });
  };

  const isStillNotVerified = useCallback(async () => {
    const res = await apiRequest("user-profile/userinfo", "GET");
    if (res.status === 200) {
      navigate("/");
    }
  }, [apiRequest, navigate]);

  useEffect(() => {
    isStillNotVerified();
  }, [isStillNotVerified]);

  return (
    <div className="w-full h-full bg-black">
      <div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-20 w-5/12">
          <div className="text-center flex gap-6 items-center justify-center">
            <img src="/logo.png" alt="" className="w-[75px]" />
          </div>
          <div className="bg-white p-8 rounded-lg flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-center">Email-Bestätigung</h3>
            <h4 className="text-lg text-center">Eine Email wurde an {mail ?? "Ihre Mail"} gesendet</h4>
            <p className="text-center text-gray-600">
              Um Zugriff auf alle Funktionen zu erhalten, bestätigen Sie bitte Ihre Email-Adresse. Überprüfen Sie Ihren
              Posteingang und klicken Sie auf den Bestätigungslink. Schauen Sie auch in Ihrem Spam-Ordner nach.
            </p>
            <div>
              <Button color="white" className="w-full" onClick={resendMail}>
                Email erneut senden
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailVerification;
