import { useEffect, useState } from "react";

const useSutff = (email) => {
  const [isStuff, setIsStuff] = useState(false);
  const [isStuffLoading, setIsStuffLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/api/v1/pharmacy/users/stuff/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsStuff(data?.isStuff);
          setIsStuffLoading(false);
        });
    }
  }, [email]);
  return [isStuff, isStuffLoading];
};

export default useSutff;
