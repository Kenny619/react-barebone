import { useQueryClient, useQuery } from "@tanstack/react-query"


export default function createGlobalState<T>(queryKey: unknown[], initialData: T | null = null) {
    return () => {
        const queryClient = useQueryClient();

        const { data } = useQuery({
            queryKey: [queryKey],
            queryFn: () => Promise.resolve(initialData),
            refetchInterval: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
        });

        function setData(data: Partial<T>) {
            queryClient.setQueryData(queryKey, data);

        }

        function resetData() {
            queryClient.invalidateQueries({
                queryKey: [queryKey],
            });
            queryClient.refetchQueries({
                queryKey: [queryKey],
            });
        }


        return { data, setData, resetData };
    };
}