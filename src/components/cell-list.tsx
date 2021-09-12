import { useTypedSelector } from '../hooks/use-typed-selector';

const CellList: React.FC = () => {
  // const cells = useTypedSelector(({ cells: { order, data } }) =>
  //   order.map((id) => data[id])
  // );
  useTypedSelector((state) => state);

  return <div>CellList</div>;
};
export default CellList;
