import 'reflect-metadata';
import { compare } from 'bcryptjs';
import UserService from './UserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

describe('UserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const userService = new UserService(fakeUserRepository);

    const user = await userService.createUser({
      name: 'Rudinilly',
      login: 'rudi123',
      password: 'rudi123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Rudinilly')
  });

  it('should not be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const userService = new UserService(fakeUserRepository);

    await userService.createUser({
      name: 'Rudinilly',
      login: 'rudi123',
      password: 'rudi123',
    });

    expect(
      userService.createUser({
        name: 'Rudinilly',
        login: 'rudi123',
        password: 'rudi123',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should authenticate a user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const userService = new UserService(fakeUserRepository);

    await userService.createUser({
      name: 'Rudinilly',
      login: 'rudi123',
      password: 'rudi123',
    });

    const authenticated = await userService.authenticate({
      login: 'rudi123',
      password: 'rudi123',
    });

    expect(authenticated).toHaveProperty('token')
  });

  it('should not authenticate a user (incorrect password)', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const userService = new UserService(fakeUserRepository);

    await userService.createUser({
      name: 'Rudinilly',
      login: 'rudi123',
      password: 'rudi123',
    });

    expect(
      userService.authenticate({
        login: 'rudi123',
        password: 'ertreter',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not authenticate a user (incorrect login)', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const userService = new UserService(fakeUserRepository);

    await userService.createUser({
      name: 'Rudinilly',
      login: 'rudi123',
      password: 'rudi123',
    });

    expect(
      userService.authenticate({
        login: 'rudi',
        password: 'rudi123',
      }),
    ).rejects.toBeInstanceOf(Error)
  });

  it('should update a user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const userService = new UserService(fakeUserRepository);

    const user = await userService.createUser({
      name: 'Rudinilly',
      login: 'rudi123',
      password: 'rudi123',
    });

    const newUser = await userService.updateUser({
      id: user.id,
      name: 'Rudinilly Rodrigues',
      login: 'rudinho',
      password: 'novasenha',
    });

    expect(newUser.name).toBe('Rudinilly Rodrigues');
    expect(newUser.login).toBe('rudinho');
    expect(await compare('novasenha', newUser.password)).toBe(true);
  });

  it('should not update a user (incorrect id)', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const userService = new UserService(fakeUserRepository);

    const user = await userService.createUser({
      name: 'Rudinilly',
      login: 'rudi123',
      password: 'rudi123',
    });

    expect(
      userService.updateUser({
        id: 'sbfsdbfsd',
        name: 'Rudinilly Rodrigues',
        login: 'rudinho',
        password: 'novasenha',
      }),
    ).rejects.toBeInstanceOf(Error)
  });

  it('should not update a user (login unavailable)', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const userService = new UserService(fakeUserRepository);

    const user = await userService.createUser({
      name: 'Rudinilly',
      login: 'rudinilly',
      password: 'rudi',
    });

    const user2 = await userService.createUser({
      name: 'Rudinilly',
      login: 'rudi123',
      password: 'rudi123',
    });

    expect(
      userService.updateUser({
        id: user.id,
        name: 'Rudinilly Rodrigues',
        login: 'rudi123',
        password: 'novasenha',
      }),
    ).rejects.toBeInstanceOf(Error)
  });
})
