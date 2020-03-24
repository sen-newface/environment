export default {
  /**
   * 子要素を全部削除
   *
   * @param {HTMLElement}
   */
  removeAllChild(elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  }
}
