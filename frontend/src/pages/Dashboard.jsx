import { fetchDashboard } from "../redux/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Users: {data?.users}</p>
      <p>Leads: {data?.leads}</p>
      <p>Revenue: {data?.revenue}</p>
    </div>
  );
};

export default Dashboard;