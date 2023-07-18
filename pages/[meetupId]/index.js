import MeetUpDetails from "../../components/meetups/MeetUpDetails";

function MeetupDetails() {
  return (
    <MeetUpDetails
      image="https://nitsaholidays.in/uploads/blog/588661nitsa.jpg"
      title="First Meetup"
      address="Some Street 5, Some City"
      description="This is a first meetup"
    />
  );
}
// since this is an dynamic page, we need id to target the data, and the id is in URL
// but we cannot use router.querry since getServerSideProps is not an component prop
export async function getStaticPaths() {
  return {
    fallback: false,
    // fallback tells the nextjs weather the paths contain all supported parameters value or some of them
    // if fallback is false then it means it contains all supported value, if you have id of m4, it will show a 404 not found page
    // if fallback is true then it means that it will try to generate a page of this meetupId dynamically on this server for the incomming request

    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
      {
        params: {
          meetupId: "m3",
        },
      },
    ],
  };
}
export async function getStaticProps(context) {
  const meetpageid = context.params.meetupId;
  console.log(meetpageid);
  return {
    props: {
      meetuData: {
        id: meetpageid,
        image: "https://nitsaholidays.in/uploads/blog/588661nitsa.jpg",
        title: "First Meetup",
        address: "Some Street 5, Some City",
        description: "This is a first meetup",
      },
    },
  };
}
// getStaticPath is required for only getStaticProps nothing else

export default MeetupDetails;
