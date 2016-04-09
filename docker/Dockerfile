FROM alpine:3.3
MAINTAINER patrick@lorio.me

RUN mkdir /app
COPY dist /app/
ENV HOST :8080
ENV SONGS_PATH /songs
ENV PLAYLIST_PATH /playlists
VOLUME ["/songs", "/playlists"]

WORKDIR /app
CMD ./app
