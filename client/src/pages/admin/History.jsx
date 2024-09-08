import Layout from "../../layouts/AdminLayout";
import DocumentHistoryCard from "../../components/Card/admin/DocHistory";
import MemberHitoryCard from "../../components/Card/admin/MemberHistory";

function History() {
  return (
    <><Layout>
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8">
        <div className="overflow-x-auto bg-white dark:bg-neutral-100 h-dvh overflow-y-scroll">
          <table className="min-w-full text-left text-xs whitespace-nowrap">
            <thead className="uppercase tracking-wider sticky top-0 bg-white dark:bg-neutral-100 ">
              <tr>
                <th scope="col" className="px-6 py-4 border-x text-xl">
                  ประวัติเอกสาร
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b ">
                <DocumentHistoryCard />
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
                  ประวัติผู้ใช้งาน
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <MemberHitoryCard />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout></>
  )
}

export default History