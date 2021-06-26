import React from "react";
import { Link } from "gatsby";

const Sec = ({ name, href, info, local = true }) => {
  const a = local;
  return (
    <>
      <span>
        <span style={{ color: "#0000ff" }} class="flex-shrink underline">
          {a ? <Link to={href}>{name}</Link> : <a href={href}>{name}</a>}
        </span>
        {info && ` (${info})`}
      </span>
    </>
  );
};

const Index = ({ data, location }) => {
  return (
    <>
      <div className="p-2 text-xl">
        <span>
          i am an artist working with code. i am currently interested in
          human-computer interaction, emergent behaviours, networking, memes,
          digitisation, functional programming, etc. this already feels too
          formal. i live in plymouth. i am younger than the internet. if it was
          called writing and not blogging, maybe i would do it...
        </span>
        {/* <div className="pt-4"> */}
        {/*   <Sec name="text" /> */}
        {/* </div> */}
        <div className="flex flex-col gap-y-1 pt-4">
          <Sec name="emojis" href="/emojis" info="2021, web, iOS only" />
          <Sec
            name="live @ solstice"
            href="https://youtu.be/acd2XJ0UTDA"
            info="2021, music, live coding"
            local={false}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
