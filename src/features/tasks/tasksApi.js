import { apiSlice } from "../api/apiSlice";

// Inject endpoints in apiSlice

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tasks
    getTasks: builder.query({
      query: () => "/tasks",
    }),

    // Get single Task
    getSingleTasks: builder.query({
      query: (id) => `/tasks/${id}`,
    }),

    // add single Task
    addTasks: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),

      // Update cache
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: newTask } = await queryFulfilled;
          if (newTask?.id) {
            // update cache of all tasks paseemestically
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                draft.push(newTask);
              })
            );
          }
        } catch (error) {}
      },
    }),

    // edit single Task
    editTasks: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedTask } = await queryFulfilled;
          if (updatedTask?.id) {
            // update the task in all tasks cache paseemestically
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                const index = draft.findIndex(
                  (task) => +task.id === +updatedTask.id
                );
                draft.splice(index, 1, updatedTask);
              })
            );

            // update the cache of single taks paseemestically
            dispatch(
              apiSlice.util.updateQueryData(
                "getSingleTasks",
                updatedTask.id.toString(),
                (draft) => {
                  Object.assign(draft, updatedTask);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    // delete single Task
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // remove the task from cache optimistically
        const cacheUpdate = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const index = draft.findIndex((task) => +task.id === +arg);
            draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          cacheUpdate.undo();
        }
      },
    }),

    // edit status of single Task
    editTaskStatus: builder.mutation({
      query: ({ id, value }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { status: value },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update the task status from cache optimistically
        const cacheUpdate = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const task = draft.find((task) => +task.id === +arg.id);
            task.status = arg.value;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          cacheUpdate.undo();
        }
      },
    }),
  }),
});
export const {
  useGetTasksQuery,
  useGetSingleTasksQuery,
  useAddTasksMutation,
  useEditTasksMutation,
  useDeleteTaskMutation,
  useEditTaskStatusMutation,
} = tasksApi;
