import MainSlider from '@/components/main/main.slider';
import { Container } from '@mui/material';
import * as React from 'react';
import { sendRequestJS } from '@/utils/old.api';
import { sendRequest } from '@/utils/api';

export default async function HomePage() {
  // const res = await fetch(`http://localhost:8000/api/v1/tracks/top`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     category: "CHILL",
  //     limit: 10,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // })

  // console.log("res", await res.json());


  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: "CHILL",
      limit: 10,
    }
  })

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: "WORKOUT",
      limit: 10,
    }
  })

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: "PARTY",
      limit: 10,
    }
  })

  return (
    <>
      <Container>
        <MainSlider
          title={"Top Chill"}
          data={chills?.data ?? []}
        />
        <MainSlider
          title={"Top Workout"}
          data={workouts?.data ?? []}
        />
        <MainSlider
          title={"Top Party"}
          data={party?.data ?? []}
        />
      </Container>
    </>
  );
}
