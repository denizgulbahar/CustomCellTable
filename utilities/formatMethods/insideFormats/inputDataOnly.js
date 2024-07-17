// Adding nothing
// Only APIData Headers from inputData
export const inputDataOnly = async (inputData) => {
    const data = await inputData 
    if (data.length !== 0) {
      const headings = Object.keys(data[0]);
      const outputData = {
        headings: headings,
        data: Object.fromEntries(headings.map(heading => [heading, { "cells": [] }]))
      };
      return outputData;
    } else {
      const outputData = {
        headings: [],
        data: []
      };
      return outputData;
    }

}