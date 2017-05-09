import React from 'react';
import * as URL from '../constants/URL';
import { LIST_MODES, SEARCH_PAYLOAD } from '../constants/UIModes';
import { fetchPokemonAction } from '../actions/pokeActions';
import { listModeChangeAction, searchPayloadChangeAction, getPayloadListAction, selectPayloadListAction } from '../actions/uiActions';
import { connect } from 'react-redux';
import { beautifyName } from '../utils/stringOperation';

const PokedexControlBar = ({ pagination, searchPayload, listMode, showPopup, payloadList, onListModeToggle, onSearchTermChange, onPayloadChange, onSearch })=>{
  return(
    <div id="pokedex-control-bar" style={{opacity: (showPopup ? "0" : "")}}>
      <div className="pokedex-control-bar-list-mode">
        {LIST_MODES.map((mode)=>(
          <div key={mode} className={(listMode===mode ? " hidden" : "")}>
            <a href="#" className={"pokedex-control-bar-list-mode-item " + mode} onClick={onListModeToggle.bind(this,mode)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </a>
            <span className="pokedex-control-bar-list-mode-item-guide">Switch to {beautifyName(mode)} mode</span>
          </div>
        ))}
      </div>
      <form className="pokedex-control-bar-search" onSubmit={(e)=>{e.preventDefault(); onSearch(searchPayload);}}>
        <span className="pokedex-control-bar-search-caption">Showing {pagination.count} results for </span>
        <select name="search-term" id="pokedex-select-search-term" className="pokedex-select" value={searchPayload.name} onChange={(e)=>{onSearchTermChange(e.target.value)}}>
          {Object.keys(SEARCH_PAYLOAD).map((key)=>(
            <option key={key} value={key}>{beautifyName(SEARCH_PAYLOAD[key].name)}</option>
          ))}
        </select>
        { payloadList && payloadList.length>0 &&
          <select name="search-payload" id="pokedex-select-payload" className="pokedex-select" value={(searchPayload.id ? searchPayload.id : -99)} onChange={(e)=>{onPayloadChange(e.target.value)}}>
            <option value="-99" disabled>{beautifyName(searchPayload.name)}</option>
            {payloadList.map(({ id, name  })=>(
              <option key={id} value={id}>{beautifyName(name)}</option>
            ))}
          </select>
        }
        <input type="submit" className="pokedex-submit" value="Search"/>
      </form>
    </div>
  );
}
const mapStateToProps = ({ ui })=>(
  {
    listMode: ui.listMode,
    showPopup: ui.showPopup,
    payloadList: ui.payloadList,
    searchPayload: ui.searchPayload,
    pagination: ui.pagination,
  }
);

const mapDispatchToProps = (dispatch)=>(
  {
    onListModeToggle: (mode)=>{
      dispatch(listModeChangeAction(mode));
    },
    onSearchTermChange: (name)=>{
      dispatch(searchPayloadChangeAction(SEARCH_PAYLOAD[name]));
      dispatch(getPayloadListAction(SEARCH_PAYLOAD[name]));
    },
    onPayloadChange:(value)=>{
      dispatch(selectPayloadListAction(value));
    },
    onSearch:(payload)=>{
      dispatch(fetchPokemonAction(payload));
    }
  }
)
export default connect(mapStateToProps,mapDispatchToProps)(PokedexControlBar);
