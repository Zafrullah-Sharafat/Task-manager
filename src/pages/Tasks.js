import TasksList from "../components/lists/TasksList";
import Sidebar from "../components/sidebar/Sidebar";
import AddNewBtn from "../components/ui/AddNewBtn";

export default function Tasks() {
  return (
    <>
      <Sidebar />

      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <AddNewBtn />
          <TasksList />
        </main>
      </div>
    </>
  );
}
