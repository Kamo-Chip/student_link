import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/candidates/onboard")}>
        Candidate sign up
      </button>
      <button onClick={() => router.push("/companies/onboard")}>Company sign up</button>
    </div>
  );
}
