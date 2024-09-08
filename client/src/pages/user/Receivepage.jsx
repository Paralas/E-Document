import Layout from "../../layouts/UserLayout";
import ReceiveCard from "../../components/Card/user/ReceiveCard";
import SendCard from "../../components/Card/user/SendCard";

function Receivepage() {
  return (
    <>
      <Layout>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <div className="overflow-x-auto bg-white dark:bg-neutral-100 h-dvh overflow-y-scrol">
              <table className="min-w-full text-left text-xs whitespace-nowrap">
                <thead className="uppercase tracking-wider sticky top-0 bg-white dark:bg-neutral-100 ">
                  <tr>
                    <th className="px-6 py-4 border-x text-xl">
                      <h1 className="text-center text-2xl">เอกสารที่ได้รับ</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <ReceiveCard />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="overflow-x-auto bg-white dark:bg-neutral-100 h-dvh overflow-y-scroll">
              <table className="min-w-full text-left text-xs whitespace-nowrap">
                <thead className="uppercase tracking-wider sticky top-0 bg-white dark:bg-neutral-100 ">
                  <tr>
                    <th className="px-6 py-4 border-x text-xl">
                      <h1 className="text-center text-2xl">เอกสารที่ได้จัดส่ง</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <SendCard />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Receivepage;
