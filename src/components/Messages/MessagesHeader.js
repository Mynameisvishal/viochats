import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    const { channelName, uniqueUsers, handleSearchChange, searchLoading,privateChannel } = this.props;
    
    
    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {channelName}
            { !privateChannel && <Icon name={"star outline"} color="black" />}
          </span>
          <Header.Subheader>{uniqueUsers}</Header.Subheader>
        </Header>

        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            loading = {searchLoading}
            size="mini"
            onChange = {handleSearchChange}
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
