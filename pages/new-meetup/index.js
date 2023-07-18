import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
function NewMeetUpPage() {
  const onAddMeetupHandler = (enteredValue) => {
    console.log(enteredValue);
  };
  return <NewMeetUpForm onAddMeetup={onAddMeetupHandler} />;
}
export default NewMeetUpPage;
