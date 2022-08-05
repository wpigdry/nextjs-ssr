import { useEffect, useState, useLayoutEffect, Suspense } from "react";
import { fetchProfileData } from "../api/fakeApi";

const initialResource = fetchProfileData();

function ProfilePage() {
  const [resource, setResource] = useState(initialResource);
  return (
    <>
      <Suspense
        fallback={
          <>
            <h1>Loading profile..................................</h1>
          </>
        }
      >
        <ProfileDetails resource={resource} />
      </Suspense>
    </>
  );
}

function Sibling({ name }) {
  useLayoutEffect(() => {
    console.log("Layout effect Sibling", name);
    return () => {
      console.log("Layout cleanup Sibling", name);
    };
  });

  useEffect(() => {
    console.log("Effect Sibling", name);

    return () => {
      console.log("Cleanup Sibling", name);
    };
  }, [name]);

  console.log("Render sibling", name);
  return <h1>Sibling</h1>;
}

function ProfileDetails({ resource }) {
  useLayoutEffect(() => {
    console.log("Layout effect ProfileDetails");
    return () => {
      console.log("Layout cleanup ProfileDetails");
    };
  });

  useEffect(() => {
    console.log("Effect ProfileDetails");
    return () => {
      console.log("Cleanup ProfileDetails");
    };
  });
  const user = resource.user.read();
  return <h1>GV火炬计划{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  useLayoutEffect(() => {
    console.log("Layout effect ProfileTimeline");
    return () => {
      console.log("Layout cleanup ProfileTimeline");
    };
  });

  useEffect(() => {
    console.log("Effect ProfileTimeline");
    return () => {
      console.log("Cleanup ProfileTimeline");
    };
  });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export default ProfilePage;
