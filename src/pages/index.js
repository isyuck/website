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
          human-computer interaction, emergent behaviours, memes, digitisation,
          nostalgia. this already feels too formal. i live in plymouth. i am
          younger than the internet.
        </span>

        {/* <div className="pt-4"> */}
        {/*   <Sec name="text" /> */}
        {/* </div> */}
        <div className="flex flex-col gap-y-1 pt-4">
          <a
            style={{ color: "#0000ff" }}
            className="underline"
            href="mailto:isaac@isaac.ac"
          >
            isaac@isaac.ac
          </a>
          <Sec
            name="tidal-party"
            href="https://github.com/isyuck/tidal-party"
            info="ongoing, with justin kuhn"
            local={false}
          />
          <Sec
            name="emojis"
            href="/emojis"
            info="2021, web, interactive, iOS only"
          />
          <Sec
            name="live @ solstice"
            href="https://youtu.be/acd2XJ0UTDA"
            info="2020, music, visual, live coding"
            local={false}
          />
          <span>more to upload...</span>
        </div>
      </div>
    </>
  );
};

export default Index;
