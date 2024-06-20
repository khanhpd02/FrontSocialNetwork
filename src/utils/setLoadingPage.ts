import { changePercentLoading } from "../redux/features/loading/loadingSlice"
import { store } from "../redux/store"


interface IState {
  value: number
}

const setLoadingPage = ({ value }: IState) => {
  console.log(1234567)
  store.dispatch(changePercentLoading(value))
}

export default setLoadingPage
