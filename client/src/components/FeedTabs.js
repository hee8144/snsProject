import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import FeedList from "./FeedList";

export default function FeedTabs({ userId, myFeedList, favFeedList, images, refresh }) {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box mt={3}>
      <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} centered>
        <Tab label="게시글" />
        <Tab label="좋아요" />
      </Tabs>
      <Box mt={2}>
        {tabValue === 0 && <FeedList feedList={myFeedList} userId={userId} images={images} refresh={refresh} />}
        {tabValue === 1 && <FeedList feedList={favFeedList} userId={userId} images={images} refresh={refresh} />}
      </Box>
    </Box>
  );
}
