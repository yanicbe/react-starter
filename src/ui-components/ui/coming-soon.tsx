import { Card } from "./card";

export const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <Card className="max-w-2xl w-full p-8 space-y-6">
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-3xl font-bold text-gray-900">Coming Soon</h1>
        <p className="text-lg text-gray-600">
          Wir arbeiten fleißig an neuen Funktionen. Schauen Sie bald wieder vorbei!
        </p>
      </Card>
    </div>
  );
};
