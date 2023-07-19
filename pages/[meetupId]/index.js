import { Fragment } from "react";
import Head from "next/head";
import MeetUpDetails from "../../components/meetups/MeetUpDetails";
import { MongoClient, ObjectId } from "mongodb";
function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetUpDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
// since this is an dynamic page, we need id to target the data, and the id is in URL
// but we cannot use router.querry since getServerSideProps is not an component prop
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Anant:This_IsAwesome@cluster0.grjntze.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // find() gives acess to all those data in the database
  // you can use filter in {} of find() to show only the sepecific data of your type. If you leave it empty all data will be fetched
  // The value of meetup will be an array containing the first document in the meetupsCollection that matches the query
  // console.log(meetup);
  return {
    fallback: false,
    // fallback tells the nextjs weather the paths contain all supported parameters value or some of them
    // if fallback is false then it means it contains all supported value, if you have id of m4, it will show a 404 not found page
    // if fallback is true then it means that it will try to generate a page of this meetupId dynamically on this server for the incomming request

    // paths: [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m3",
    //     },
    //   },
    // ],
    paths: meetup.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
// The params object is typically used in the getStaticPaths and getStaticProps functions to define the paths that will be statically generated.
// The params object can contain any number of properties, but the most common properties are those that are used to represent the dynamic parts of the page URL.
export async function getStaticProps(context) {
  const meetpageid = context.params.meetupId;
  // meetpageid will give you hold of the id in database, but this id is basically in string form
  const client = await MongoClient.connect(
    "mongodb+srv://Anant:This_IsAwesome@cluster0.grjntze.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedmeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetpageid),
  });

  //  The ObjectId() function is used to convert the meetpageid string to an ObjectID object.
  // console.log(meetpageid);
  return {
    props: {
      // meetuData: {
      //   id: meetpageid,
      //   image: "https://nitsaholidays.in/uploads/blog/588661nitsa.jpg",
      //   title: "First Meetup",
      //   address: "Some Street 5, Some City",
      //   description: "This is a first meetup",
      // },
      // meetupData: selectedmeetup,
      // since now the meetup id is converted to object, it now needs to be converted to string
      meetupData: {
        id: selectedmeetup._id.toString(),
        title: selectedmeetup.title,
        image: selectedmeetup.image,
        address: selectedmeetup.address,
        description: selectedmeetup.description,
      },
    },
  };
}
// getStaticPath is required for only getStaticProps nothing else

export default MeetupDetails;
