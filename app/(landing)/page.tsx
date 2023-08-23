import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      <h3>Landing page</h3>(Unpprotected)
      <div>
        <Link href="/sign-in">
          <Button>Se connecter</Button>
        </Link>
        <Link href="/sign-up">
          <Button>S'inscrire</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
