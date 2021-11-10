#!/bin/bash

yarn install

if [[ ${NODE_ENV} == "production" ]]
then
  yarn build && yarn start
else
  yarn develop
fi
