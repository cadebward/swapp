/**
 * currency utility
 *
 * Converts a number to a string with commas eg 1,000
 */

module.exports = function(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}