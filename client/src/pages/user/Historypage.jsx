import Layout from "../../layouts/UserLayout";
import HistoryCard from "../../components/Card/user/HistoryCard"


function Historypage() {
  return (
    <>
      <Layout>
      <div className="grid grid-cols-1 gap-4">
        <div className="overflow-x-auto h-dvh mx-4">
          <h2 className="text-2xl text-left text-black">ประวัติการทำงานในระบบ</h2>
          <HistoryCard />
        </div>
      </div>
      </Layout>
    </>
  );
}

export default Historypage;
