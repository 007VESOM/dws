
export interface CharacterStats {
  kindness: number;
  intelligence: number;
  athleticism: number;
  mysteriousness: number;
  charm: number;
}

export interface Character {
  id: string;
  name: string;
  japaneseName: string;
  role: string;
  age: number;
  birthday: string;
  height: number;
  // bloodType, voiceActor 제거
  scent: string;        // 대체 필드 1: 체향
  romanceStyle: string; // 대체 필드 2: 연애 스타일
  hobby: string;
  personality: string;
  catchphrase: string;
  description: string;
  color: string;
  imageUrl: string;
  stats: CharacterStats;
  secretIdentity: string;
}
