import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { memo } from "react";

import { RootState } from "../../redux/store";

const TopLoader: React.FC = () => {
  // const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.loading.value);
  return (
    <LoadingBar
      waitingTime={500}
      progress={progress}
      // onLoaderFinished={() => dispatch(setToploaderProgress(0))}
      color="#456fe6"
    />
  );
};

export default memo(TopLoader);
