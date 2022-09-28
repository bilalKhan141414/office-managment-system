import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tbl_settings',
})
export class SettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: string;

  @Column({
    default: () => 'NOW::DATE()',
  })
  createdAt: Date;

  @Column({
    default: () => 'NOW::DATE()',
  })
  updatedAt: Date;
}
