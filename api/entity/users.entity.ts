import { Entity, PrimaryGeneratedColumn, Column,
  OneToOne, JoinColumn } from 'typeorm'


const NULL = {nullable: true}
@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    // Check this NULL is valid or not.
    @Column()
    crypted_password: string

    @Column()
    salt: string

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @Column('datetime', NULL)
    updated_at: Date

    @Column({default: 'waiting'})
    approval_state: 'waiting' | 'approved'

    @Column('datetime', NULL)
    last_login_at: Date

    @Column('datetime', NULL)
    last_logout_at: Date

    @Column('varchar', NULL)
    last_login_from_ip_address: string

    @Column()
    family_name: string

    @Column()
    given_name: string

    @Column()
    handle_name: string

    @Column('datetime', NULL)
    birthday: Date

    @Column({nullable:true, type:'varchar'})
    email_mobile: string

    @Column({default: false})
    admin: boolean

    @Column()
    class_year_id: number

    @Column('number', NULL)
    ml_member_id: number

    @Column()
    activation_token: string

    // TO DO: if production, set it to be false.
    @Column({default: true})
    activation_status: boolean

    @Column({nullable:true, type:'varchar'})
    access_token: string
}
