window.WBPSCBookmarks={
  get(){return WBPSCStorage.get("wbpsc-bookmarks",[])||[]},
  toggle(id){const items=this.get();const next=items.includes(id)?items.filter(x=>x!==id):[...items,id];WBPSCStorage.set("wbpsc-bookmarks",next);return next.includes(id)},
  has(id){return this.get().includes(id)}
};
