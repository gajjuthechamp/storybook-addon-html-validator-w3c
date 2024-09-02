import { ArrowDownIcon } from "@storybook/icons";
import React, { Fragment, useState } from "react";
import { Placeholder } from "storybook/internal/components";
import { styled } from "storybook/internal/theming";

type Item = {
  title: string;
  description: string;
  fromTo: string;
  extract: string
};

interface ListItemProps {
  item: Item;
}

interface ListProps {
  items: Item[];
}

const ListWrapper = styled.ul({
  listStyle: "none",
  fontSize: 14,
  padding: 0,
  margin: 0,
});

const WrapperOuter = styled.li(({ theme }) => ({
  display: "block",
  width: "100%",
  borderBottom: `1px solid ${theme.background.hoverable}`,
}));

const Wrapper = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  borderBottom: `1px solid ${theme.appBorderColor}`,
  "&:hover": {
    background: theme.background.hoverable,
  },
}));

const Icon = styled(ArrowDownIcon)(({ theme }) => ({
  height: 10,
  width: 10,
  minWidth: 10,
  color: theme.color.mediumdark,
  marginRight: 10,
  transition: "transform 0.1s ease-in-out",
  alignSelf: "center",
  display: "inline-flex",
}));

const HeaderBar = styled.div(({ theme }) => ({
  padding: theme.layoutMargin,
  paddingLeft: theme.layoutMargin - 3,
  background: theme.background.hoverable,
  color: "inherit",
  textAlign: "left",
  cursor: "pointer",
  borderLeft: "3px solid transparent",
  width: "100%",

  "&:focus": {
    outline: "0 none",
    borderLeft: `3px solid ${theme.color.secondary}`,
  },
}));

const Description = styled.div(({ theme }) => ({
  padding: theme.layoutMargin,
  background: "#FFFCCC",
  fontFamily: theme.typography.fonts.mono,
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: 1.5,
  overflow: "auto",
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  textAlign: "left",
}));

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const [open, onToggle] = useState(false);

  return (
    <WrapperOuter>
      <Wrapper>
        <HeaderBar onClick={() => onToggle(!open)} role="button">
          <Icon
            style={{
              transform: `rotate(${open ? 0 : -90}deg)`,
            }}
          />
          {item.title}
        </HeaderBar>
      </Wrapper>
      {open ? 
        <Description>
          <Placeholder>
            <small>{item.fromTo}</small>
            <div>{item.description}</div>
            <pre>{item.extract}</pre>
          </Placeholder>
        </Description> 
        
        : null}
    </WrapperOuter>
  );
};

export const List: React.FC<ListProps> = ({ items }) => (
  <ListWrapper>
    {items.map((item, idx) => (
      <ListItem key={idx} item={item}></ListItem>
    ))}
  </ListWrapper>
);
