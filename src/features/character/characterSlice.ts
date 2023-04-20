import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { fetchCharacter } from './characterAPI';

interface CharacterState {
  charactersList: Character[];
  status: 'idle' | 'loading' | 'failed';
  pages: number;
}

const initialState: CharacterState = {
  charactersList: [],
  status: 'loading',
  pages: 1,
}

export const getCharactersAsync = createAsyncThunk(
  'counter/fetchCharacters',
  async ({ name, page }: { name: string; page: number }) => {
    const response = await fetchCharacter(name, page);
    return response;
  }
);

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    cleanList: (state) => {
      state.charactersList = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharactersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCharactersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.charactersList = action.payload.characters;
        state.pages = action.payload.pages;
      })
      .addCase(getCharactersAsync.rejected, (state) => {
        state.status = 'failed';
        state.charactersList = initialState.charactersList;
        state.pages = initialState.pages;
      });
  },
});

export const { cleanList } = characterSlice.actions

export const selectCount = (state: RootState) => state.character.charactersList;

export default characterSlice.reducer;
