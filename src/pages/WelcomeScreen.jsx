import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";

export default function ShowUp(){
    return (
        <>
            <SignedIn>
                <h1>Welcome to StriveSports!</h1>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn redirectUrl="/Components/Signup/signup"/>
            </SignedOut>
        </>
    );
}
