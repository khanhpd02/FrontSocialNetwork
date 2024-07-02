import { changePercentLoading } from "../redux/features/loading/loadingSlice"
import { store } from "../redux/store"


interface IState {
  value: number
}

const setLoadingPage = ({ value }: IState) => {
  store.dispatch(changePercentLoading(value))
}

export default setLoadingPage
