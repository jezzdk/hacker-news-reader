export default function useWait() {
  return (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};
}
