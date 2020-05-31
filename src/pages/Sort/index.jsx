import React, { useState, useEffect } from 'react';
import SimilarityPhoto from './SimilarityPhoto'
import BlurredPhoto from './BlurredPhoto'
import {Radio} from 'antd'
export default () => {
  const [tab, setTab] = useState("0");
  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
    setTab(e.target.value)
  }
  return(
    <div>
      <Radio.Group onChange={onChange} defaultValue="0" style={{marginRight: "1%"}}>
        <Radio.Button value="0">重复照片</Radio.Button>
        <Radio.Button value="1">模糊照片</Radio.Button>
      </Radio.Group>
      <br/><br/>
      {tab === "0" && <SimilarityPhoto/>}
      {tab === "1" && <BlurredPhoto/>}
    </div>
  )
};
