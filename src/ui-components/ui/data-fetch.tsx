import { Button } from "./button";
import Preloader from "./preloader";

const DataFetchParent = ({
  isLoading,
  data,
  renderElement,
}: {
  isLoading: boolean;
  data: any;
  renderElement: (data: any) => React.ReactNode;
}) => {
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : data ? (
        renderElement(data)
      ) : (
        <div className="w-full justify-center flex">
          <div className="flex flex-col items-center">
            <div>Es ist ein Fehler aufgetreten</div>
            <div>
              <Button onClick={() => window.location.reload()}>Seite neu laden</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataFetchParent;
