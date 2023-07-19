import { Fragment } from "react";
import Head from "next/head";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
function NewMeetUpPage() {
  const router = useRouter();
  async function onAddMeetupHandler(enteredValue) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredValue),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a new meetups</title>
        <meta
          name="description"
          content="Add new interactive and pleasing meetups"
        />
      </Head>
      <NewMeetUpForm onAddMeetup={onAddMeetupHandler} />
    </Fragment>
  );
}
export default NewMeetUpPage;
