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
    url: `http://localhost:8000/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: "CHILL",
      limit: 10,
    }
  })

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `http://localhost:8000/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: "WORKOUT",
      limit: 10,
    }
  })

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `http://localhost:8000/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: "PARTY",
      limit: 10,
    }
  })

  return (
    <>
      <Container>
        <MainSlider data={chills?.data ?? []} />
        <MainSlider data={workouts?.data ?? []} />
        <MainSlider data={party?.data ?? []} />
      </Container>
    </>
  );
}
