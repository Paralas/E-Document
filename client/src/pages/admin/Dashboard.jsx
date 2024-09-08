import Layout from "../../layouts/AdminLayout";
import DocumentCard from "../../components/Card/admin/DocCard"
import LogCard from "../../components/Card/admin/UserCard"

function Dashboard() {
  return (
    <>
    <Layout>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <div className="overflow-x-auto bg-white dark:bg-neutral-100 h-dvh overflow-y-scroll">
              <table className="min-w-full text-left text-xs whitespace-nowrap">
                <thead className="uppercase tracking-wider sticky top-0 bg-white dark:bg-neutral-100 ">
                  <tr>
                    <th scope="col" className="px-6 py-4 border-x text-xl">
                      เอกสารในระบบ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b ">
                    <DocumentCard />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="overflow-x-auto bg-white dark:bg-neutral-100 h-dvh overflow-y-scroll">
              <table className="min-w-full text-left text-xs whitespace-nowrap">
                <thead className="uppercase tracking-wider sticky top-0 bg-white dark:bg-neutral-100 ">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-xl">
                      ผู้ใช้งานในระบบ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                  <LogCard />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Dashboard